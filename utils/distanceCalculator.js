function calcDist(loc1, loc2) 
    {
      const R = 6371; // km
      const dLat = toRad(loc1[0]-loc2[0]);
      const dLon = toRad(loc1[1]-loc2[1]);
      const lat1 = toRad(loc1[0]);
      const lat2 = toRad(loc2[0]);
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c;
      return d;
    }
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

async function distanceCalculate(userLocation, allSightings){

const birdsWithDistance = allSightings.map((bird) => {
    bird.distanceFromUser = calcDist(userLocation, bird.coordinates.coordinates).toFixed(1);
    return bird;
})
return birdsWithDistance.sort((a, b) => a.distanceFromUser - b.distanceFromUser)
}
export { distanceCalculate }