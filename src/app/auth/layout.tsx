import { Toaster } from "@/components/ui/toaster";

const AuthLayout = ({ 
    children 
}: { children: React.ReactNode 

}) => {
    return ( 
        <div className="h-full flex items-center justify-center">
            {children}
            <Toaster />
        </div>
     );
}
 
export default AuthLayout;