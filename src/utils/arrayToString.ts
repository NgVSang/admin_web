const arrayToSTring = (arr: any) => {
    return arr?.reduce((acc:any, cur:any) => {
      if (acc !== null) {
        return String(acc + ", " + cur);
      } else {
        return String(cur);
      }
    }, null);
  };
  export default arrayToSTring;