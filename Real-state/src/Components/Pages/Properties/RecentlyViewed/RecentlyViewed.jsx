import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RecentlyViewedData from "./RecentlyViewedData";
import "../Properties.css";
function RecentlyViewed({ Viewed }) {
    return (
        <div className="d-flex align-items-center bg-white shadow rounded p-3">
            <img src={Viewed.img} alt={Viewed.title} className="rounded me-3 RecentImg" />
            <div>
                <div className="fw-semibold">{Viewed.title}</div>
                <div className="fw-bold mainclr">{Viewed.price}</div>
                <div className="text-muted">Beds:{Viewed.beds} Baths:{Viewed.baths} Sqft:{Viewed.sqft}</div>
            </div>
        </div>
    );
}
function ViewedDisplay() {
    if (!Array.isArray(RecentlyViewedData) || RecentlyViewedData.length === 0) {
        return <p>Recently viewed propertied will be shown</p>;
      }
    return (
        <div id="recentlyViewed" className="d-grid gap-3">
            {RecentlyViewedData.map((Viewed, index) => (
                <RecentlyViewed key={index} Viewed={Viewed} />
            ))}
        </div>
    );
}

export default ViewedDisplay;