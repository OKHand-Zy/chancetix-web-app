import {Navbar} from "./_components/page-header"

interface ResultPageLayoutProps {
  children: React.ReactNode
}
const ResultPageLayout = ({ children } : ResultPageLayoutProps) => {
  return (
    <div className="h-screen w-screen flex flex-col gap-y-10 items-center justify-center bg-blue-500">
      <Navbar /> 
      {children}
    </div>
  );
}

export default ResultPageLayout