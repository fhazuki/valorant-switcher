import { useEffect, useState } from "react";
import axios from 'axios';

export default function LoggedInAccount() {
    const [account, setAccount] = useState<null | {
        game_name: string,
        rank: string,
        level: number,
    }>(null);

    useEffect(() => {
        axios.get('http://localhost:8000/current')
        .then(res => setAccount(res.data))
        .catch(() => setAccount(null));
    }, []);

    if (!account) return null;

    return (
        <div className="flex flex-col items-center mt-6">
            <h2 className="text-lg font-semibold text-gray-700">ログイン中のアカウント</h2>
            <div className="text-2xl font-bold mt-2">{account.game_name}</div>
            <div className="flex gap-4 mt-1 text-sm text-gray-600">
                <div>ランク: {account.rank}</div>
                <div>レベル: {account.level}</div>
            </div>
        </div>
    );
}