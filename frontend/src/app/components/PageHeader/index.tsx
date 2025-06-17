interface PageHeaderProps {
    heading: string,
    text?: string,
}

const PageHeader = ({ heading, text } : PageHeaderProps) => {
    return (
        <div className="w-full text-center flex flex-col items-center justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold max-w-1/2">{heading}</h2>
            { text && <p className="text-lg lg:text-xl text-gray-600 mt-4 max-w-1/2">{text}</p> }
        </div>
    );
}

export default PageHeader;