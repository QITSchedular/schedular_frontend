import notify from "devextreme/ui/notify";

export const notification = (message, type)=>{
    const position={
        right:50,
        top:50
      }
      const direction="up-push"
      return notify(
        { 
          message: message, 
          width: 300, 
          shading: true,
          type:type,
          displayTime: 3000,
          minWidth:150
        },{
          position,
          direction
        });
}
