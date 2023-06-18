import ShowProduct from "@components/ShowProduct"

export default function Page({ params: { id }}:any) {
    
    return(
        <>
            <ShowProduct id={id} />
        </>
        
    )
}