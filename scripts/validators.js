export function validateActivity(activity) {
    const errors ={};
     const title =activity.title?.trim() || "";
     if(title.length <3 || title.length >100) {
        errors.title ="Title must be between 3 and 100  characters.";
     }
     const dueDate = activity.dueDate;
     if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
        errors.dueDate ="Enter a valid due date.";
     }
     else {
        const parsedDate = new Date(`${dueDate}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
         if(
            Number.isNaN(parsedDate.getTime()) ||
            parsedDate.toISOString().slice(0, 10) !== dueDate ||
            parsedDate < today
         ){
            errors.dueDate ="Due Date must be today or in the future.";
         }
     }
      const duration = Number(activity.duration);
      if (!Number.isInteger(duration) || duration <1 ||duration >1440) {
        errors.duration ="Duration must be an integer from 1 to 1440 minutes.";
      }
      const tag =activity.tag?.trim() || "";
      const tagPattern =/^[A-Za-z][A-Za-z -]{1,29}$/;
      if(!tagPattern.test(tag)) {
        errors.tag ="Tag must start with a letter and contain 2-30 letters, spaces, or hyphens.";
      }
      if(/<[^>]*>/.test(title)){
        errors.title ="HTML tags are not allowed in the title.";

      }
      return{
        isValid: Object.keys(errors).length ===0,
        errors
      };
      }
}