import React from "react";

const Asset = ({
    id,
    mfr,
    floor_no,
    asset_type,
    room_no,
    install_date,
    last_serviced_date,
    repairs_ct,
    uptime,
    work_orders_ct
}) => {


    return (<div className="card mt-3">
        <p className="card-header">Asset {id} at Floor {floor_no}, Room {room_no}</p>
        <div className="card-body">
            <p className="card-title">asset_type: {asset_type} by manufacturer {mfr}</p>
            <p className="card-text">Installed {install_date}, Last Service on {last_serviced_date}. uptime: {uptime}</p>
            <p className="card-text">Repaired {repairs_ct} times, {work_orders_ct} historical work orders</p>
        </div>

    </div>)
}

export default Asset;