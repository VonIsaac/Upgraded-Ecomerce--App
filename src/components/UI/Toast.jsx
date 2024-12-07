


const Toast = ({children}) => {
    return(
        <div className="toast toast-center">
            <div className="alert alert-info">
                <span>{children}</span>
            </div>
            
        </div>
    )
}

export default Toast