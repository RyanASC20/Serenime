import Icon from '@mdi/react';
import {
    mdiEmoticonCryOutline,
    mdiEmoticonFrownOutline,
    mdiEmoticonSadOutline,
    mdiEmoticonNeutralOutline,
    mdiEmoticonHappyOutline,
    mdiEmoticonOutline,
    mdiEmoticonExcitedOutline,
} from "@mdi/js";

export const icons = [
    mdiEmoticonCryOutline,
    mdiEmoticonFrownOutline,
    mdiEmoticonSadOutline,
    mdiEmoticonNeutralOutline,
    mdiEmoticonHappyOutline,
    mdiEmoticonOutline,
    mdiEmoticonExcitedOutline
];

let colors = [];
for (let i = 0; i < icons.length; i++) {
    colors.push(`emote-${ i }`);
}

export { colors }

export const iconElements: JSX.Element[] = icons.map((ic, idx) => {
    return <Icon className={ `fill-current inline text-${colors[idx]} ` } key={ idx } path={ ic } title={ ic } size={ 1 }></Icon>
});


export default Icon;


// const colors = [
//     'red', 'orange', 'yellow', 
// ]

// export default icons.map((ic, idx) => {
//     return <Icon key={ idx } path={ ic } title={ ic } size={ 1 }></Icon>
// });



