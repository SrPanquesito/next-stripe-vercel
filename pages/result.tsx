import { useRouter } from 'next/router'
import useSWR from 'swr';

export default function Result() {
    const router = useRouter();
    const { session_id } = router.query;

    const { data, error } = useSWR(
        router.query.session_id ? `/api/checkout/${router.query.session_id}` : null,
        // url argument comes from the previous line where we define it ↑ 
        (url) => fetch(url).then(res => res.json())
    )

    return (
        <>
            <h1>Payment</h1>
            <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
        </>
    )
}