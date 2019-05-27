import Cookies from 'universal-cookie';

class Utils {
    static BASE_URL = "https://servicy.herokuapp.com/api"
    static cookies = new Cookies();

    static getFormatStatus(status) {
        switch (status) {
            case 'active':
                return 'Kích hoạt'
            case 'inactive':
                return 'Chưa kích hoạt'
            case 'pending':
                return 'Chờ duyệt'
            case 'running':
                return 'Đang chạy'
            case 'done':
                return 'Hết hạn'
            default:
                return "NOT A STATUS"
        }
    }

    static getFormatAdtype(status) {
        switch (status) {
            case 'Enterprise':
                return 'Doanh nghiệp'
            case 'Normal':
                return 'Thường'
            default:
                return "NOT AN AD TYPE"
        }
    }

    static getFormatRole(status) {
        switch (status) {
            case 'admin':
                return 'Quản trị viên'
            case 'provider':
                return 'Nhà cung cấp'
            case 'user':
                return 'Người dùng thường'
            default:
                return "NOT A ROLE"
        }
    }

    static getFormatDate(mongoDate) {
        let jsDate = new Date(mongoDate)
        return `${jsDate.getFullYear()}-${jsDate.getMonth() + 1}-${jsDate.getDate()} ${jsDate.getHours()}:${jsDate.getMinutes()}:${jsDate.getSeconds()}`
    }
}

export default Utils;