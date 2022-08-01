import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import mockData from '../../mockData';
import Card from '../card';
import styles from './kanban.module.scss';

const Kanban = () => {
    const [data, setData] = useState(mockData);

    const onDragEnd = (result) => {
        console.log("RESULT", result)
        console.log("DES", result.destination)
        if (!result.destination) return

        const {source, destination} = result

        if (source.droppableId !== destination.droppableId) {
            // Get index source and destination
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            console.log("SOURCEINDEX", sourceColIndex)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
            console.log("DESTINATIONINDEX", destinationColIndex)

            // Get column source and destination
            const sourceCol = data[sourceColIndex]
            console.log("SOURCECOL", sourceCol)
            const destinationCol = data[destinationColIndex]
            console.log("DESTINATIONCOL", destinationCol)

            // Get list source and destination
            const sourceTask = [...sourceCol.tasks]
            console.log("SOURCETASK", sourceTask)
            const destinationTask = [...destinationCol.tasks]
            console.log("DESTINATIONTASK", destinationTask)

            // Delete column in source and add column in destination
            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            // 
            data[sourceColIndex].tasks = sourceTask
            console.log("ABC", data[sourceColIndex].tasks)
            data[destinationColIndex].tasks = destinationTask
            console.log("XYZ", data[destinationColIndex].tasks)

            setData(data)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles["kanban"]}>
                {
                    data.map(section => (
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className={styles['kanban__section']}
                                    ref={provided.innerRef}
                                >
                                    <div className={styles["kanban__section__title"]}>
                                        {section.title}
                                    </div>
                                    <div className={styles["kanban__section__content"]}>
                                        {
                                            section.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.5' : '1'
                                                            }}
                                                        >
                                                            <Card>
                                                                {task.title}
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    )
}

export default Kanban