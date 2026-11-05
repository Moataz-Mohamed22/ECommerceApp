export interface IProduct {
  id: number
  name: string
  description: string
  photos: IPhoto[]
  price: number
  oldPrice: number
  categoryName: string

}

export interface IPhoto {
  imageName: string
  productId: number
}
