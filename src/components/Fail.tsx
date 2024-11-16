type Props = {
    message: string
}

const Fail = (props: Props) => {
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 ">
            <h1 className="text-2xl font-semibold">Fail</h1>
            <p>{props.message}</p>
        </main>
    )
}

export default Fail