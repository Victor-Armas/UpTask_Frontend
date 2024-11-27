import { BrowserRouter, Route,Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import DetailsProjectView from "./views/projects/DetailsProjectView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
//import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import RegisterViews from "./views/auth/RegisterViews";
import NotFound from "./views/404/NotFound";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<DashboardView/>} index />
                    <Route path="/projects/create" element={<CreateProjectView/>} />
                    <Route path="/projects/:projectId" element={<DetailsProjectView/>} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView/>} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView/>} />
                    {/* <Route path="/auth/register" element={<RegisterView/>} index />
                     */}
                    <Route element={<ProfileLayout/>}>
                        <Route path="/profile" element={<ProfileView/>} index />
                        <Route path="/profile/password" element={<ChangePasswordView/>} index />
                    </Route>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>} index />
                    <Route path='/auth/register' element={<RegisterViews />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView/>} index />
                    <Route path="/auth/request-code" element={<RequestNewCodeView/>} index />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView/>} index />
                    <Route path="/auth/new-password" element={<NewPasswordView/>} index />
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="*" element={<NotFound/>}  />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}