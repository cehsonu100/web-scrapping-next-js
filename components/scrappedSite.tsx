
import ModalCompact from '@/components/shared/ModalCompact';
import { useEffect, useState } from 'react'
import Modal from 'react-modal';

type ScrappedSiteProps = {
  contents: {
    link: string,
    data: string[]
  }
}

export default function ScrappedSite(props: ScrappedSiteProps) {
  const contents = props.contents;
  const [showModal, setShowModal] = useState(false);

  const modalShowHandler = () => {
    console.log("clicked")
    setShowModal(!showModal);
  }

  return (
    <div className="my-3 w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        
      {/* <ul className="list-none hover:list-inside divide-y divide-dashed"> */}
      <div onClick={modalShowHandler} className="ml-5 p-5 bg-slate-600 rounded-xl max-w-5xl hover:cursor-pointer hover:text-gray-100">
        <span onClick={modalShowHandler} className="text-sm text-gray-300 hover:text-gray-100 hover:cursor-pointer" key={contents.link}>{contents.link}</span>
      </div>
      {/* </ul> */}

      {/* <Modal isOpen={showModal} shouldCloseOnOverlayClick={true}> */}
        {/* <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl"> */}
          {/* <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16"> */}
            {/* <h3 className="text-2xl font-bold text-gray-900">{contents.link}</h3> */}
            {/* {sentences(contents.data)} */}
            {/* <button onClick={modalShowHandler} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Close</button> */}
          {/* </div> */}
        {/* </div> */}
      {/* </Modal> */}
      <ModalCompact showModal={showModal} closeModal={modalShowHandler} contentBody={sentences(contents.data)} link={contents.link}/>
    
    </div>
  )
}


const sentences = (dataArray: string[]) => {
  let sentences: JSX.Element[] = [];
  dataArray.forEach((data: any) => {
    sentences.push(
      <div className='divide-y divide-dashed'>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg> */}
        <p className='mt-4'>{data}</p>
      </div>
    );
  })
  return sentences;
}