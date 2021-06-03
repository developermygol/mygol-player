import React from 'react';
import { Text } from 'react-native';
import { Localize } from '../../components/locale/Loc';

const MatchCumulativeFouls = ({ match, style }) => {
  const cumulativeFoulEventType = 36;
  const { idHomeTeam, idVisitorTeam, status, events } = match;
  const isMatchPlaying = status === 3;

  const getCumulativeFouls = () => {
    const reverseEvents = events.reverse();

    const [extraSecondIdx, extraFristIdxm, secondPartIdx, firstPartIdx] = [
      reverseEvents.findIndex(ev => ev.type === 17),
      reverseEvents.findIndex(ev => ev.type === 15),
      reverseEvents.findIndex(ev => ev.type === 11),
      reverseEvents.findIndex(ev => ev.type === 1),
    ];

    if (extraSecondIdx !== -1)
      return retriveCumulativeFoulsByTeam(filterRelevantEvents(reverseEvents, extraSecondIdx));
    if (extraFristIdxm !== -1)
      return retriveCumulativeFoulsByTeam(filterRelevantEvents(reverseEvents, extraFristIdxm));
    if (secondPartIdx !== -1)
      return retriveCumulativeFoulsByTeam(filterRelevantEvents(reverseEvents, secondPartIdx));
    if (firstPartIdx !== -1)
      return retriveCumulativeFoulsByTeam(filterRelevantEvents(reverseEvents, firstPartIdx));

    return retriveCumulativeFoulsByTeam(filterRelevantEvents(reverseEvents));
  };

  const filterRelevantEvents = (events, index = -1) =>
    events.filter((ev, i) => {
      if (i >= index && ev.type === cumulativeFoulEventType) return true;
      return false;
    });

  const retriveCumulativeFoulsByTeam = fouls => [
    fouls.filter(foul => foul.idTeam === idHomeTeam).length,
    fouls.filter(foul => foul.idTeam === idVisitorTeam).length,
  ];

  if (!isMatchPlaying) return null;

  const [homeFouls, visitorFouls] = getCumulativeFouls();

  return <Text style={{ ...style }}>{`${Localize('Match.Fouls')} ${homeFouls} - ${visitorFouls}`}</Text>;
};

export default MatchCumulativeFouls;
