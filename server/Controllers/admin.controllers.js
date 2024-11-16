const admincontrollers = {
    getAdminDashboard: async (req, res) => {
        try {
            return res.render('index')
        } catch (error) {
            console.log('getAdminDashboard : ' + error.message)
        }
    },
    getTourLocations: async (req, res) => {
        try {
            return res.render('product/tour_location')
        } catch (error) {
            console.log('getTourLocations : ' + error.message)
        }
    }
}
export default admincontrollers