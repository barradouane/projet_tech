export default function GestionCard(props){
    <div className="bg-gradient-to-bl from-primary to-secondary border-secondary border-[1px] p-8 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-2xl font-semibold text-white text-left">
            {props.titre}
          </h3>
          <hr />
          <motion.div
            className="bg-gray-50 hover:bg-light p-4 text-center text-secondary sm:text-[20px] text-[18px] font-medium rounded-lg shadow-md cursor-pointer "
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/posts_for_admin")}
          >
            {props.action1}
          </motion.div>
          
          <motion.div
            className="bg-gray-50 hover:bg-light text-secondary p-4 text-center sm:text-[20px] text-[18px] font-medium rounded-lg shadow-md cursor-pointer "
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigation("/addData")}
          >
            {props.action2}
          </motion.div>
          
        </div>
}