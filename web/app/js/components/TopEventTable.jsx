import BaseTable from './BaseTable.jsx';
import React from 'react';
import { withContext } from './util/AppContext.jsx';
import { directionColumn, srcDstColumn } from './util/TapUtils.jsx';
import { formatLatencySec, numericSort } from './util/Utils.js';

const topColumns = ResourceLink => [
  {
    title: " ",
    key: "direction",
    dataIndex: "direction",
    width: "60px",
    render: directionColumn
  },
  {
    title: "Name",
    key: "src-dst",
    render: d => srcDstColumn(d, ResourceLink)
  },
  {
    title: "Path",
    dataIndex: "path",
    sorter: (a, b) => a.path.localeCompare(b.path),
  },
  {
    title: "Count",
    dataIndex: "count",
    defaultSortOrder: "descend",
    sorter: (a, b) => numericSort(a.count, b.count),
  },
  {
    title: "Best",
    dataIndex: "best",
    sorter: (a, b) => numericSort(a.best, b.best),
    render: formatLatencySec
  },
  {
    title: "Worst",
    dataIndex: "worst",
    sorter: (a, b) => numericSort(a.worst, b.worst),
    render: formatLatencySec
  },
  {
    title: "Last",
    dataIndex: "last",
    sorter: (a, b) => numericSort(a.last, b.last),
    render: formatLatencySec
  },
  {
    title: "Success Rate",
    dataIndex: "successRate",
    sorter: (a, b) => numericSort(a.successRate.get(), b.successRate.get()),
    render: d => !d ? "---" : d.prettyRate()
  }
];

class TopEventTable extends BaseTable {
  render() {
    return (
      <BaseTable
        dataSource={this.props.tableRows}
        columns={topColumns(this.props.api.ResourceLink)}
        rowKey="key"
        pagination={false}
        className="top-event-table"
        size="middle" />
    );
  }
}

export default withContext(TopEventTable);
