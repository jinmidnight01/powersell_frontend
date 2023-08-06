import useFetch from './usefetch';

function Grow1() {

    const TestData = useFetch('http://localhost:3001/orderData');
    if(TestData !== undefined && TestData !== null && TestData.length)
    {
        console.log(TestData);
    }

  return (
    <div>
        {TestData !== undefined && TestData !== null && TestData.length > 0 &&
              TestData.map((item) => (
                  <div key={item.id}>{item.address}</div>
        ))}
    </div>
  )
}

export default Grow1