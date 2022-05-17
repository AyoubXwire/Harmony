
function Alert({ data }) {

    if (data.length === 0) return null

    return (
        <div className="alerts">
            {
                data.map((alert, index) => {
                    return (
                        <div key={index} role="alert" className={`alert alert-${alert.type} alert-dismissible fade show container animate__animated animate__fadeInDown animate__faster`}>
                            <div className="mm-alert-text">{alert.message}</div>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Alert