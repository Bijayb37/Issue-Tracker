import React from 'react'
import "../styles/projectPage.css"
import { useTable, usePagination } from 'react-table'
import IssueItem from './IssueItem'

function ProjectPage(props) {
    const { project } = props
    if (project) {
        const myIssues = project.issues.map((issue, i) => (
            <IssueItem
                issue={issue}
                key={i}
                index={i + 1}
                small
            />
        ))
        return (
            <div>
                <div className="projectPageHeader">
                    <h1 className="display-6">{project.projectName}</h1>
                    <button type="button" className="btn btn-primary btn-sm">edit</button>
                    <button type="button" className="btn btn-secondary btn-sm">remove</button>
                </div>
                <blockquote className="blockquote">
                    <p>{project.createdBy.username}</p>
                </blockquote>
                <div className="issuesTable">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Target date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myIssues}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )

}


export default ProjectPage