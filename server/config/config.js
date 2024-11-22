const config = {
    port: process.env.PORT,
    private_key: process.env.PRIVATE_KEY,
    mongodb_url: process.env.MONGO_URI,
    server_company_logo_img_url: process.env.COMPANY_LOGO_IMAGE_PATH,
    server_tour_location_img_url: process.env.TOUR_LOCATION_IMAGE_PATH,
    server_tour_category_img_url: process.env.TOUR_CATEGORY_IMAGE_PATH,
    server_post_category_img_url: process.env.POST_CATEGORY_IMAGE_PATH,
    server_post_img_url: process.env.POST_IMAGE_PATH,
    server_tour_img_url: process.env.TOUR_IMAGE_PATH
}
export default config