import { addUserProject } from "@/api/TeamApi"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({user, reset}: SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!
    
    const queryClient = useQueryClient()
    
    const {mutate} = useMutation({
        mutationFn: addUserProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey:['projectTeam', projectId]})
        }
    })

    const handleAddUserProject = () => {
        const data = {
            projectId, 
            id: user._id
        }
        mutate(data)
    }

  return (
    <>
        <p className="mt-10 font-bold uppercase text-lg pb-4 border-b-4">Resultado</p>
        <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold">{user.name}</p>
            <p className="text-xl font-bold">{user.email}</p>
            <button
                className="text-blue-600 hover:bg-blue-100 px-10 py-3 font-bold cursor-pointer"
                onClick={handleAddUserProject}
            >Agregar al Proyecto</button>
        </div>
    </>
  )
}
