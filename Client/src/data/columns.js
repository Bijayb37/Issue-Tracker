import { Link } from 'react-router-dom'
import IssueMenu from '../components/IssueMenu'
import { formatDateTime } from '../utils/helperFunctions'
import '../styles/columnStyles.css'
import { ProjectMenu } from '../components/ProjectMenu'

export const projectColumns = () => {
  const projectLink = (values) => <Link to={`/projects/${values._id}`} className="link">{values.projectName}</Link>
  return [
    {
      Header: "Title",
      accessor: "projectName",
      Cell: (cellInfo) => projectLink(cellInfo.row.original)
    },
    {
      Header: "Created By",
      accessor: "createdBy.username",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      Cell: ({ value }) => value ? new Date(value).toDateString() : "No Date Set"
    },
    {
      Header: "Members",
      Cell: (cellInfo) => cellInfo.row.original.assignedUsers.length + 1
    },
    {
      Header: "Target Date",
      accessor: "targetEndDate",
      Cell: ({ value }) => value ? new Date(value).toDateString() : "No Date Set"
    },
    {
      Header: "Actions",
      Cell: (cellInfo) => <ProjectMenu project={cellInfo.row.original} />
    },
  ]
}


export const projectPageIssueColumns = () => {
  const issueLink = (values) => <Link to={`/issues/${values._id}`} className="link">{values.title}</Link>
  return [
    {
      Header: "Title",
      accessor: "title",
      Cell: (cellInfo) => issueLink(cellInfo.row.original)
    },
    {
      Header: "Created By",
      accessor: "createdBy.username",
    },
    {
      Header: "Added",
      accessor: "createdAt",
      Cell: ({ value }) => formatDateTime(value)
    },
    {
      Header: "Updated",
      accessor: "updatedAt",
      Cell: ({ value }) => formatDateTime(value) 
    },
    {
      Header: "Actions",
      Cell: (cellInfo) => <IssueMenu issue={cellInfo.row.original} />
    },
  ]
}

export const membersColumns = (admin) => [
  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Role",
    Cell: ({ row }) => admin._id === row.original._id ? "Admin" : "Member"
  },
  {
    Header: "Email Address",
    accessor: "email",
  },
]
