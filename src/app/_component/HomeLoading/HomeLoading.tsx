import { Skeleton } from "src/components/ui/skeleton"

export default function HomeLoading() {
    return (
        <>

            {
                Array.from({ length: 5 }).map((el,i) => {
                    return <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3' key={i}>
                        <div  className="flex items-center space-x-4 bg-red-600">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                    </div>
                })
            }
        </>
    )
}
