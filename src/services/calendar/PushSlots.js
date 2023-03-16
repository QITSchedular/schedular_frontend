export const pushslots = async (slots, availableSlots) => {
    console.log("here" + availableSlots.length)
    if (slots.length < availableSlots.length) {
        const startIndex = availableSlots.length - slots.length;
        availableSlots = await  availableSlots.slice(startIndex);
      }
    
      // Remove unavailable slots from slots array
      //create a new slot array
      const newSlots=[];
      for (let i = 0; i < slots.length; i++) {
        if (availableSlots[i] !== "2") {
        await newSlots.push(slots[i])
        }
      }
      return newSlots;
}