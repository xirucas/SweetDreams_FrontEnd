import { MDBFooter } from 'mdb-react-ui-kit';

export const Footer = () => {
  const Ano = () => {
    const data = new Date();
    const ano = data.getFullYear();
    return ano;
  }
  const ano = Ano();
  return (
    <MDBFooter className='text-center text-white bottom-0 start-0 end-0' style={{ backgroundColor: '#fff' }}>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <a className='text-white ' href='/'>
          SweetDreams
        </a>
        {` - Copyright © ${ano}`}
      </div>

    </MDBFooter>
  )
}