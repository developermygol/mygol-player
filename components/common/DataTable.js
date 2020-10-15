import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

import { Localize } from '../locale/Loc';
import { gColors } from '../../GlobalStyles';
import { getClipEllipsis } from '../Utils';

export const textRenderhandler = (row, col, rowIndex, colIndex, valueAdapter) => {
  const st = [style.TdDefault, col.style, col.styleField ? row[col.styleField] : null];
  let val = row[col.fieldName];

  if (valueAdapter) val = valueAdapter(val, row, col);

  return (
    <Text key={col.id} style={st} numberOfLines={1} ellipsizeMode={getClipEllipsis()}>
      {val === 0 ? 0 : val || '-'}
    </Text>
  );
};

export const headerTextRenderHandler = col => {
  const st = [style.TdDefault, col.headerStyle];
  return (
    <Text key={col.id} style={st} numberOfLines={1} ellipsizeMode={getClipEllipsis()}>
      {col.title}
    </Text>
  );
};

class DataRow extends Component {
  render() {
    const { row, columns, rowIndex } = this.props;

    return (
      <View style={style.Tr}>
        {columns.map((col, colIndex) => {
          const renderHandler = col.renderHandler || textRenderhandler;
          const result = renderHandler(row, col, rowIndex, colIndex, col.valueAdapter);
          return result;
        })}
      </View>
    );
  }
}

class DataTable extends Component {
  renderHeader = columns => {
    return (
      <View style={[style.Thr, this.props.headerStyle]}>
        {columns.map((col, colIndex) => {
          const renderHandler = col.headerRenderHandler || headerTextRenderHandler;
          return renderHandler(col, colIndex);
        })}
      </View>
    );
  };

  render() {
    const p = this.props;
    if (!p.data) return <Text style={style.Empty}>{Localize('NoData')}</Text>;

    return (
      <View style={p.style}>
        {p.columns && !p.hideHeader ? this.renderHeader(p.columns) : null}
        {p.data
          ? p.data.map((row, rowIndex) => (
              //   <DataRow key={row[p.dataKeyField]} rowIndex={rowIndex} columns={p.columns} row={row} />
              <DataRow key={uuid.v4()} rowIndex={rowIndex} columns={p.columns} row={row} />
            ))
          : null}
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {},
  Empty: {
    textAlign: 'center',
    color: gColors.minorError,
    paddingVertical: 10,
  },
  Thr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 8,
    backgroundColor: gColors.tableHeaderBack,
  },
  Tr: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 5,
  },
  TdDefault: {
    textAlign: 'left',
    flex: 1,
  },
});

export default DataTable;
