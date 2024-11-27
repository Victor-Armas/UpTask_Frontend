import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getFullProjectsById} from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/addTaskModal"
import ListTask from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskData"
import DetailsTaskModal from "@/components/tasks/TaskDetailsModal"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"



export default function DetailsProjectView() {

    const {data: user, isLoading: authLoading} = useAuth()

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProjectsById(projectId),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id,[data,user])

    if(isLoading && authLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>
    
    if(data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            {isManager(data.manager, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >Agregar Tarea</button>

                    <Link
                        to={'team'}
                        className="bg-blue-500 hover:bg-blue-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    >Colaboradores</Link>
                </nav>

            )}

            <ListTask
                tasks={data.tasks}
                canEdit={canEdit}
            />

            <AddTaskModal/>
            <EditTaskData/>
            <DetailsTaskModal/>
        </>
    )
}