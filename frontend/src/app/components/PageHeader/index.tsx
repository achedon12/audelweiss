interface PageHeaderProps {
    heading: string,
    text?: string,
}

const PageHeader = ({ heading, text } : PageHeaderProps) => {
    return (
        <div className="w-full text-center">
            <h2 className="text-4xl lg:text-5xl font-bold">{heading}</h2>
            { text && <p className="font-bold text-lg lg:text-xl mt-4">{text}</p> }
        </div>
    );
}

export default PageHeader;