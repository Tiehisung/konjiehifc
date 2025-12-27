import { IManager } from "@/app/admin/managers/page";
import { IMatchProps } from "@/app/matches/(fixturesAndResults)";
import { kfc } from "@/data/kfc";
import { checkTeams } from "@/lib";
import { formatDate } from "@/lib/timeAndDate";



export const friendlyTemplates = (match: IMatchProps, official: { requester: IManager }) => {
    const { home, away } = checkTeams(match);
    const homeName = home?.name ?? "Home Team";
    const awayName = away?.name ?? "Away Team";
    const opponentName = match?.opponent?.name ?? "Opponent Club";
    const venue = match?.venue?.name
    const date = formatDate(match?.date);

    return [
        {
            id: "friendly_1",
            isPopular: true,
            title: "Standard Friendly Request",
            tag: "friendly",
            body: `
            <div>Dear <b>${opponentName}</b>,</div>

            <div>We would like to request a friendly match between <b>${homeName}</b> and <b>${awayName}</b>.</div>

            <ul>
            <li><b>Fixture:</b> ${homeName} vs ${awayName}</li>
            <li><b>Date:</b> ${date}</li>
            <li><b>Venue:</b> ${venue}</li>
            </ul>

            <div>We believe this fixture would be beneficial for both teams in terms of preparation and development.</div>

            <div>Kind regards,<br/>
            <b>${official?.requester?.fullname}</b><br/>
            ${official?.requester?.phone}<br/>
            ${kfc.name}</div>
                        `.trim(),
        },

        {
            id: "friendly_2",
            title: "Pre-Season Friendly",
            tag: "friendly",
            body: `
            <div>Dear <b>${opponentName}</b>,</div>

            <div>As part of our pre-season preparations, <b>${homeName}</b> would like to arrange a friendly match against <b>${awayName}</b>.</div>

            <ul>
            <li><b>Fixture:</b> ${homeName} vs ${awayName}</li>
            <li><b>Preferred Date:</b> ${date}</li>
            <li><b>Venue:</b> ${venue}</li>
            </ul>

            <div>Please let us know if your team is available.</div>

            <div>Best regards,<br/>
            ${kfc.name}</div>
                        `.trim(),
        },

        {
            id: "friendly_3",
            title: "Mid-Season Friendly",
            tag: "friendly",
            body: `
<div>Dear <b>${opponentName}</b>,</div>

<div>We are interested in scheduling a mid-season friendly between <b>${homeName}</b> and <b>${awayName}</b>.</div>

<ul>
<li><b>Fixture:</b> ${homeName} vs ${awayName}</li>
<li><b>Date:</b> ${date}</li>
</ul>

<div>This would be a valuable opportunity for squad rotation and tactical testing.</div>

<div>Sincerely,<br/>
<b>${official?.requester?.fullname}</b><br/>
${official?.requester?.phone}<br/>
${kfc.name}</div>
            `.trim(),
        },

        {
            id: "friendly_4",
            title: "Home Friendly Invitation",
            tag: "friendly",
            body: `
<div>Dear <b>${opponentName}</b>,</div>

<div>We would like to invite <b>${awayName}</b> to play a friendly match against <b>${homeName}</b> at our home ground.</div>

<ul>
<li><b>Fixture:</b> ${homeName} vs ${awayName}</li>
<li><b>Date:</b> ${date}</li>
<li><b>Venue:</b> ${venue}</li>
</ul>

<div>We look forward to your response.</div>

<div>Warm regards,<br/>
<b>${official?.requester?.fullname}</b><br/>
${official?.requester?.phone}<br/>
${kfc.name}</div>
            `.trim(),
        },

        {
            id: "friendly_5",
            title: "Away Friendly Request",
            tag: "friendly",
            body: `
<div>Dear <b>${opponentName}</b>,</div>

<div><b>${homeName}</b> would like to request an away friendly match against <b>${awayName}</b> at your venue.</div>

<ul>
<li><b>Proposed Date:</b> ${date}</li>
<li><b>Venue:</b> ${venue}</li>
</ul>

<div>Please let us know if you are able to host this fixture.</div>

<div>Best wishes,<br/>
<b>${official?.requester?.fullname}</b><br/>
${official?.requester?.phone}<br/>
${kfc.name}</div>
            `.trim(),
        },

        {
            id: "friendly_6",
            title: "Development Friendly",
            tag: "friendly",
            body: `
<div>Dear <b>${opponentName}</b>,</div>

<div>We would like to organize a development-focused friendly match between <b>${homeName}</b> and <b>${awayName}</b>.</div>

<ul>
<li><b>Date:</b> ${date}</li>
<li><b>Venue:</b> ${venue}</li>
</ul>

<div>This will support player development and squad depth.</div>

<div>Kind regards,<br/>
<b>${official?.requester?.fullname}</b><br/>
${official?.requester?.phone}<br/>
${kfc.name}</div>
            `.trim(),
        },

        {
            id: "friendly_7",
            title: "Training Friendly",
            tag: "friendly",
            body: `
<div>Dear <b>${opponentName}</b>,</div>

<div>As part of our training schedule, <b>${homeName}</b> would like to play a friendly match against <b>${awayName}</b>.</div>

<ul>
<li><b>Date:</b> ${date}</li>
<li><b>Venue:</b> ${venue}</li>
</ul>

<div>Please advise if your team is available.</div>

<div>Best regards,<br/>
<b>${official?.requester?.fullname}</b><br/>
${official?.requester?.phone}<br/>
${kfc.name}</div>
            `.trim(),
        },

        {
            id: "friendly_8",
            title: "Friendly Match Confirmation Request",
            tag: "friendly",
            body: `
<div>Dear <b>${opponentName}</b>,</div>

<div>We would like to confirm your availability for a friendly match between <b>${homeName}</b> and <b>${awayName}</b>.</div>

<ul>
<li><b>Date:</b> ${date}</li>
<li><b>Venue:</b> ${venue}</li>
</ul>

<div>We appreciate your reply at your earliest convenience.</div>

<div>Sincerely,<br/>
<b>${official?.requester?.fullname}</b><br/>
${official?.requester?.phone}<br/>
${kfc.name}</div>
            `.trim(),
        },

        {
            id: "friendly_9",
            title: "Community Friendly",
            tag: "friendly",
            body: `
<div>Dear <b>${opponentName}</b>,</div>

<div>We would love to arrange a friendly match between <b>${homeName}</b> and <b>${awayName}</b> as a community-focused fixture.</div>

<ul>
<li><b>Date:</b> ${date}</li>
<li><b>Venue:</b> ${venue}</li>
</ul>

<div>This will be a great opportunity to engage supporters and promote local football.</div>

<div>Warm regards,<br/>
<b>${official?.requester?.fullname}</b><br/>
${official?.requester?.phone}<br/>
${kfc.name}</div>
            `.trim(),
        },

        {
            id: "friendly_10",
            title: "Friendly Match Proposal",
            tag: "friendly",
            body: `
<div>Dear <b>${opponentName}</b>,</div>

<div>On behalf of <b>${homeName}</b>, we propose a friendly match against <b>${awayName}</b>.</div>

<ul>
<li><b>Proposed Date:</b> ${date}</li>
<li><b>Preferred Venue:</b> ${venue}</li>
</ul>

<div>Please let us know if this works for your club.</div>

<div>Yours sincerely,<br/>
<b>${official?.requester?.fullname}</b><br/>
${official?.requester?.phone}<br/>
${kfc.name}</div>
            `.trim(),
        },
    ];
}
