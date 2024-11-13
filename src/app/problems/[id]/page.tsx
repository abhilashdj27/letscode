export default async function Problem( {params}: {params: { id:string }}) {
    const { id } = await params;
    return <h1>Problems: {id}</h1>
}