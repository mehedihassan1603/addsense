// useClickCount.js
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

export const useClickCount = () => {
  const { data: clickCount } = useQuery('clickCount', async () => {
    const response = await axios.get('/userinfo');
    const foundEmail = response.data.find((item) => item.userEmail === user.email);
    return foundEmail?.count || 0;
  });

  const mutation = useMutation((newCount) => axios.post('/userinfo', {
    count: newCount,
    userEmail: user.email,
  }));

  const updateClickCount = async () => {
    const newCount = clickCount + 1;
    mutation.mutate(newCount);
  };

  return { clickCount, updateClickCount };
};
