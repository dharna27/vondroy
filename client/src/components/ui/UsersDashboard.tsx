import { Loader2 } from "lucide-react";
import useGetConversation from "../../hooks/useGetConversations";
import UserCard from "../UserCard";

const UsersDashboard = () : React.JSX.Element => {

    const {loading, users} = useGetConversation();

    return (
        <main className="bg-white rounded-lg flex flex-col justify-start items-start gap-4 px-4 py-5 h-[500px] w-fit">
            <h2 className="font-0 font-medium text-xl text-[#353535]">Message</h2>
            <div className="users flex flex-col gap-2 overflow-y-scroll scroll-smooth">
                {users && users.map((user) => {
                    return <UserCard key={user.id} userDetails = {user} />
                })}
                {loading ? <div className="w-72 h-full flex justify-center items-center"><Loader2 className="animate-spin" /></div> : null}
            </div>
        </main>
    )
}

export default UsersDashboard;