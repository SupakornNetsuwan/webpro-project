const formatFollowersStatistic = (followersStatistic) => {
 // template วัน
 const dateRecordsTemplate = Array.from([...new Array(7)].keys()).map(
    (numberDayBefore) => [
      new Date(
        new Date().getTime() - numberDayBefore * 24 * 60 * 60 * 1000
      ).toLocaleDateString("th"),
      0,
    ]
  );

  // ข้อมูลที่ fetch มาได้เอามา format ตัววันที่
  const fetchedFollowersStatistic = followersStatistic.map(
    (eachDayRecord) => [
      new Date(eachDayRecord.roundedDate).toLocaleDateString("th"),
      eachDayRecord.amount,
    ]
  );

  // ทำให้เป็นรูปแบบ ["20/5/2023", "xx/5/2023", "yy/5/2023", ...]
  const getOnlyFetchedDate = fetchedFollowersStatistic.map(([fetchedRoundedDate, fetchedAmount]) => {
    return fetchedRoundedDate
  })
  
  const finalStatistic = dateRecordsTemplate.map(([roundedDate, amount]) => {
    if(getOnlyFetchedDate.includes(roundedDate)){
      return fetchedFollowersStatistic.find(target => target[0] === roundedDate)
    }
    return [roundedDate, amount]
  });
  
  return finalStatistic.reverse();
}

export default formatFollowersStatistic