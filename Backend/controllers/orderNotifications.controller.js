import orderNotificationsModal from "../Modals/Notifications/orderNotifications.modal.js"; 

export const getUserNotificationsByUserId = async (req, res) => {
    try {
        
        const { id } = req.params;
        console.log({id})
        if (!id) return res.status(400).json({ message: "User ID is required" });

        const notifications = await orderNotificationsModal.find({ userId:id});
        

        res.status(200).json({
            success: true,
             notifications
        })



    } catch (error) {

       console.log("error in order notifications" , error);
       
        res.status(500).json({
            success: false,
            message: error?.message || "Something went wrong"
        })
    }
    }
