export interface Property {
    id: number,
    title: string,
    description: string,
    address: string,
    price: number
    user: {
        id: number,
        username: string,
        email: string,
        phone: string
    }
    property_images: [
        {
            id: number,
            filename: string
            link: string
        }
    ]
}