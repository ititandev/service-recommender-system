class Utils {
    static getFormatStatus(status){
        switch(status){
            case 'active':
            return 'kích hoạt'
            case 'inactive':
            return 'chưa kích hoạt'
            case 'pending':
            return 'chờ duyệt'
            case 'running':
            return 'đang chạy'
            case 'done':
            return 'hết hạn'
            default:
            return "NOT A STATUS"
        }
    }

    static getFormatAdtype(status){
        switch(status){
            case 'Enterprise':
            return 'doanh nghiệp'
            default:
            return "NOT AN AD TYPE"
        }
    }

    static getFormatRole(status){
        switch(status){
            case 'admin':
            return 'quản trị viên'
            case 'provider':
            return 'nhà cung cấp'
            case 'user':
            return 'người dùng thường'
            default:
            return "NOT AN AD TYPE"
        }
    }

    static getFormatDate(mongoDate){
        let jsDate = new Date(mongoDate)
        return `${jsDate.getFullYear()}-${jsDate.getMonth() + 1}-${jsDate.getDate()} ${jsDate.getHours()}:${jsDate.getMinutes()}:${jsDate.getSeconds()}`
    }

    static state = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1Y2Q2MmQwYTUwMjI1MjJiZGE4ZDliODUiLCJyb2xlIjoidXNlciIsImlhdCI6MTU1Nzc0NjYzOSwiZXhwIjoxNTU4MzUxNDM5fQ.YER38uWtmhWT3xwX8AJbM7CHolR2NYRNTXJK-jBEEi8",
        user:{
            _id: "5cd62d0a5022522bda8d9b85",
            email: "a",
            password: "$2b$10$L4Iaoz7K1gVbkqWaWiX0pufnOlZsA0cy9bFRxo6SCGcQ4wQ1LtTD6",
            firstname: "ITitan",
            lastname: "Dev",
            role: "user",
            phone: "03652353625",
            avatar: "https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
        },
    }
}

export default Utils;