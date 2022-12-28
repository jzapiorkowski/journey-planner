function calculateCost(distance, kilometerCost) {
  const cost =
    distance * kilometerCost * 2.1 + Math.ceil(distance / 800) * 1000;
  return cost.toFixed(2);
}

export default calculateCost;
