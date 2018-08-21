import React from 'react';
import ListingSnippet from './ListingSnippet.jsx';
import ReservationDetails from './ReservationDetails.jsx';
import Promo from './Promo.jsx';


class ReservationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasDates: false
    };
  }

  componentDidMount() {
    this.getListingInfo();
  }

  getListingInfo() {
    let url = `/api/listings/${this.props.listingId}`;
    fetch(url)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      this.setListingDetails(res)
    })
    .catch(err => console.log(err))
  }

  handleDatesSelect () {
    this.setState({
      hasDates: true
    })
  }

  handleDatesReset () {
    this.setState ({
      hasDates: false
    })
  }

  setListingDetails (data) {
    let hostId = Math.floor(Math.random()* 10000000);
    let avgRating = Math.floor(Math.random()*50)/10;
    const rate = 99;
    const minStay = 1;
    let maxGuests = 10;
    const taxRate = 15;
    let weeklyViews = Math.floor(Math.random() * 10000);
    let fees = 15;
    let listing = {
      id: data.id,
      hostId: hostId, 
      rate: rate,
      // reviewsCount: data.reviews.total_reviews,
      avgRating: avgRating,
      minStay: minStay,
      maxGuests: maxGuests,
      fees: fees,
      taxRate: taxRate,
      weeklyViews: weeklyViews
    }
    this.setState({
      listing: listing
    })
  }


  render() {

    if (!this.state.listing) return null;

    return (
      <div className="container">
        <ListingSnippet 
          listing={this.state.listing} 
        />
        <ReservationDetails 
          listing={this.state.listing} 
          onDatesSet={this.handleDatesSelect.bind(this)} 
          onDatesReset={this.handleDatesReset.bind(this)}
        />
        <Promo 
          views={this.state.listing.weeklyViews} 
          hasDates={this.state.hasDates} 
        />
      </div>
    );
  }
}

export default ReservationBox;
