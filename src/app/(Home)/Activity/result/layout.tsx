import {Navbar} from "./_components/page-header"

interface ResultPageLayoutProps {
  children: React.ReactNode
}
const ResultPageLayout = ({ children } : ResultPageLayoutProps) => {
  return (
    <div className="h-screen w-screen flex flex-col gap-y-10 items-center justify-center bg-blue-500">
      <div className="bg-secondary flex flex flex-col justify-center items-center p-4 rounded-xl w-2/1 shadow-sm gap-y-4">
        <Navbar /> 
        {children}
      </div>
    </div>
  );
}

export default ResultPageLayout