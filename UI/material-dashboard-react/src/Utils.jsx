import Cookies from 'universal-cookie';

class Utils {
    static BASE_URL = "https://servicy.herokuapp.com"
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

    static defaultState = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1Y2Q2MmQwYTUwMjI1MjJiZGE4ZDliODUiLCJyb2xlIjoidXNlciIsImlhdCI6MTU1Nzc0NjYzOSwiZXhwIjoxNTU4MzUxNDM5fQ.YER38uWtmhWT3xwX8AJbM7CHolR2NYRNTXJK-jBEEi8",
        user: {
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

    static state = Utils.defaultState

    static serviceTestData = [
        {
            "rating": {
                "total": 2,
                "points": 7
            },
            "info": {
                "location_id": {
                    "_id": "5ccd4e7d24fe4a35cc622587",
                    "name": "Ho Chi Minh"
                },
                "address": "322 Trần Duy Hưng",
                "price": "15000VND-100000VND",
                "website": "bongdaplus.vn",
                "content": "Cung cấp các dịch vụ ăn uống: trà sữa, bún bò,.. một cách nhanh chóng"
            },
            "comments": [
                {
                    "replies": [
                        {
                            "_id": "5cd6a44d847b973b3f35103c",
                            "user_id": {
                                "_id": "5cd62d0a5022522bda8d9b85",
                                "firstname": "ITitan",
                                "lastname": "Dev",
                                "avatar": "https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                            },
                            "content": "Day la reply",
                            "date_time": "2019-05-11T10:30:37.212Z",
                            "__v": 0
                        }
                    ],
                    "_id": "5cd67a225db5354e540ad5ca",
                    "user_id": {
                        "_id": "5cd62d0a5022522bda8d9b85",
                        "firstname": "ITitan",
                        "lastname": "Dev",
                        "avatar": "https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                    },
                    "content": "Hay vcl",
                    "date_time": "2019-05-11T07:30:42.235Z"
                },
                {
                    "replies": [],
                    "_id": "5cd6a349de686233e74cddd3",
                    "user_id": {
                        "_id": "5cd62d0a5022522bda8d9b85",
                        "firstname": "ITitan",
                        "lastname": "Dev",
                        "avatar": "https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
                    },
                    "content": "Very good",
                    "date_time": "2019-05-11T10:26:17.370Z",
                    "__v": 0
                }
            ],
            "images": [
                "https://banner2.kisspng.com/20180627/zkj/kisspng-android-google-play-flat-avatar-5b340fe303b272.1119788915301385950152.jpg",
                "https://banner2.kisspng.com/20180627/zkj/kisspng-android-google-play-flat-avatar-5b340fe303b272.1119788915301385950152.jpg"
            ],
            "ratings": [
                "5cd6adb022a94f39610057c6"
            ],
            "_id": "5ccd4c86ea92292b92e3fb07",
            "avatar": "https://material-ui.com/static/images/grid-list/breakfast.jpg",
            "name": "foody",
            "description": "Website cung cap dia diem an uong",
            "provider_id": {
                "_id": "5cd69960101138183e51f190",
                "firstname": "provider",
                "lastname": "provider",
                "avatar": "https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
            },
            "category_id": {
                "_id": "5ccd4f2224fe4a35cc622589",
                "name": "Food"
            },
            "status": "active"
        }
    ]

    static userTestData = [
        { "_id": "5cd642ea14260d55483d7317", "email": "b", "password": "$2b$10$L4Iaoz7K1gVbkqWaWiX0pufnOlZsA0cy9bFRxo6SCGcQ4wQ1LtTD6", "firstname": "ITitan", "lastname": "Dev", "role": "admin", "avatar": "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg", "phone": "0358628596", "__v": 0 }
        , { "_id": "5cd69960101138183e51f190", "email": "d", "password": "$2b$10$QLhj4aKckAYSnrDuQBMN3e0QziBA5Hk7Q9Dcwrl.IN57JR5JVq4O2", "firstname": "Zalo", "lastname": "Group", "role": "provider", "phone": "03652353625", "avatar": "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg" }
        , { "_id": "5cda7c4306cb1e63bac920a9", "email": "a", "password": "$2b$10$0gwpL5M5u4HdP4o2qz2yyODc0TYhAqYM7b934ZsV5vW5tlE3Jgg9q", "firstname": "a", "lastname": "a", "role": "user", "phone": "03652353625", "avatar": "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg" }
        , { "_id": "5cdd5e8f90adbc5d95cd3311", "email": "caochanhduong@gmail.com", "password": "$2b$10$0gwpL5M5u4HdP4o2qz2yyODc0TYhAqYM7b934ZsV5vW5tlE3Jgg9q", "firstname": "Cao Chánh", "lastname": "Dương", "role": "user", "phone": "0329681621", "avatar": "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg" }
        , { "_id": "5cdd5eaf90adbc5d95cd3312", "email": "kietlt@gmail.com", "password": "$2b$10$0gwpL5M5u4HdP4o2qz2yyODc0TYhAqYM7b934ZsV5vW5tlE3Jgg9q", "firstname": "Lương Tuấn", "lastname": "Kiệt", "role": "user", "phone": "0329681231", "avatar": "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg" }
        , { "_id": "5cdd5ede90adbc5d95cd3313", "email": "manhld@gmail.com", "password": "$2b$10$0gwpL5M5u4HdP4o2qz2yyODc0TYhAqYM7b934ZsV5vW5tlE3Jgg9q", "firstname": "Lê Đức", "lastname": "Mạnh", "role": "provider", "phone": "0329381231", "avatar": "https://i.pinimg.com/originals/0d/36/e7/0d36e7a476b06333d9fe9960572b66b9.jpg" },
    ]

    static adTestData = [
        {
            "_id": "5ccd50f8b2839c297af79c31",
            "provider": {
                "_id": "5cd69960101138183e51f190",
                "firstname": "provider",
                "lastname": "provider",
                "avatar": "https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
            },
            "status": "running",
            "banner": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png",
            "url": "https://www.facebook.com/",
            "name": "ad1",
            "date_time": "2019-05-03T17:00:00.000Z",
            "adtype": {
                "_id": "5ccd51d524fe4a35cc62258d",
                "name": "Normal",
                "max_views": 10
            },
            "views": 7,
            "data_time": "2019-05-11T11:29:39.534Z"
        },
        {
            "_id": "5ccd53d39c6b54297aad85cd",
            "provider": {
                "_id": "5cd69960101138183e51f190",
                "firstname": "provider",
                "lastname": "provider",
                "avatar": "https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg"
            },
            "status": "running",
            "banner": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1024px-Icon-round-Question_mark.svg.png",
            "url": "https://www.youtube.com/",
            "name": "ad2",
            "date_time": "2019-05-04T17:00:00.000Z",
            "adtype": {
                "_id": "5ccd522524fe4a35cc62258e",
                "name": "Enterprise",
                "max_views": 1000
            },
            "views": 7,
            "data_time": "2019-05-11T23:27:17.766Z"
        }
    ]

    static cateTestData = [
        { "_id": "5ccd4f2224fe4a35cc622589", "name": "Ăn uống", "status": "active" },
        { "_id": "5ccd4f4324fe4a35cc62258a", "name": "Giáo dục", "status": "active" },
        { "_id": "5ccd4f8724fe4a35cc62258b", "name": "Thời trang", "status": "active" },
        { "_id": "5cd98dcf6c1bed67b05f7229", "name": "Thể thao", "status": "active", "__v": 0 },
        { "_id": "5cda5279ef6e6d3facd761ff", "name": "Văn hóa", "status": "pending", "__v": 0 },
    ]
}

export default Utils;