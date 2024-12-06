import { toast } from "react-toastify"

const AlertMessage = (success, error) => {
    if (success) {
        toast.success(success)
    } else {
        toast.error(error)
    }
}

export default AlertMessage