import { auth, signOut } from "@/auth";

const SettingPage = async() => {
    const seesion = await auth();
    return (
        <div>
            {JSON.stringify(seesion)}
            <form action={ async () => {
                "use server";
                await signOut();
            }}>
                <button type="submit">
                    Sing out
                </button>
            </form>
        </div>
    )
}

export default SettingPage;