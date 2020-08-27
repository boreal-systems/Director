import React, { useState } from 'react'
import { useQuery } from 'urql'
import { Button, DataTable, DataTableSkeleton, InlineNotification } from 'carbon-components-react'
import headers from './panelsHeaders'
import GraphQLError from '../components/GraphQLError.jsx'
import Panel from './components/Panel.jsx'

const { Table, TableContainer, TableExpandRow, TableExpandedRow, TableHead, TableHeader, TableRow, TableBody, TableCell, TableToolbar, TableToolbarContent, TableToolbarSearch } = DataTable

const Panels = () => {
  const [newPanelVisability, setNewPanelVisability] = useState(false)
  const [result] = useQuery({
    query: `query getAll {
      stacks {
        id
        label
        panelLabel
        description
      }
      panels {
        id
        label
        description
        layout {
          id
          label
          rows
          columns
        }
        layoutType {
          id
          label
        }
        buttons {
          row
          column
          stack {
            id
            label
            panelLabel
            description
          }
        }
      }
    }`,
    pollInterval: 1000
  })

  if (result.error) return <GraphQLError error={result.error} />
  if (result.fetching) return <DataTableSkeleton headers={headers} />
  if (result.data) {
    return (
      <div>
        <InlineNotification
          style={{ width: '100%' }}
          lowContrast={true}
          kind='warning'
          title='This interface is being overhauled'
          subtitle='Items may move and/or break in the near future, please report bugs to Phabricator T96'
          hideCloseButton={true}
        />
        <DataTable
          isSortable
          rows={result.data.panels}
          headers={headers}
          render={({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            onInputChange,
            getToolbarProps,
            getTableContainerProps
          }) => (
            <TableContainer
              title="Panels"
              description="A Panel is a virtual abstraction of a control interface."
              {...getTableContainerProps()}
            >
              {!newPanelVisability &&
                <div>
                  <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
                    <TableToolbarContent>
                      <TableToolbarSearch onChange={onInputChange} />
                      <Button onClick={() => { setNewPanelVisability(true) }}>New Panel</Button>
                    </TableToolbarContent>
                  </TableToolbar>
                </div>
              }
              {newPanelVisability &&
                <div>
                  <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
                    <TableToolbarContent>
                      <TableToolbarSearch onChange={onInputChange} />
                      <Button onClick={() => { setNewPanelVisability(false) }} size='default' kind="secondary">Cancel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                    </TableToolbarContent>
                  </TableToolbar>
                  <Panel new stacks={result.data.stacks} visability={ setNewPanelVisability }/>
                </div>
              }
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableHeader />
                    {headers.map((header, index) => (
                      <TableHeader key={index} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length !== 0 && rows.map(row => (
                    <React.Fragment key={row.id}>
                      <TableExpandRow {...getRowProps({ row })}>
                        {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableExpandRow>
                      <TableExpandedRow colSpan={headers.length + 1}>
                        <Panel panels={result.data.panels} panelID={row.id} stacks={result.data.stacks}/>
                      </TableExpandedRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        />
      </div>
    )
  }
}

export default Panels