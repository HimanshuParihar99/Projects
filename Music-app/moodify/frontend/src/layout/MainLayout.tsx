import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar";

const MainLayout = () => {
  const isMobile = false;
  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <ResizablePanelGroup direction="horizontal" className="flex-1 h-full overflow-hidden p-2">
        {/* left sidebar panel */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30} >
          <LeftSidebar />
        </ResizablePanel>
<ResizableHandle className="w-2 rounded-lg bg-black transition-colors"/>
        {/* main content panel */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60} >
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 rounded-lg bg-black transition-colors"/>

        {/* right sidebar panel */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0} >
          Friends activity
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout
