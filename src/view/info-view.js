import AbstractView from '../framework/view/abstract-view.js';
import { getAvailableOffers, isMonthEqual } from '../utils/point.js';
import dayjs from 'dayjs';


const POINTS_QUANTITY_TO_DISPLAY_MIDDLE = 3;
const MIDDLE_OF_THREE = 1 ;
const ONLY_POINT_IN_ROUTE =1 ;
const TWO_POINTS_IN_ROUTE_ONLY =2;

const createInfoTemplate = (sortedPoints, allOffers) => {

  if (sortedPoints === null || ((Object.keys(sortedPoints)).length === 0 )) {
    return '<section></section>';
  }

  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];
  const firstDestination = firstPoint.destination.name;
  const firstDateFrom= dayjs(firstPoint.dateFrom).format('MMM DD');
  const lastDestination = lastPoint.destination.name;
  let lastDateTo =  dayjs(lastPoint.dateTo).format('MMM DD');
  lastDateTo= isMonthEqual(firstDateFrom, lastDateTo) ? dayjs(lastPoint.dateTo).format('DD') : dayjs(lastPoint.dateTo).format('MMM DD');


  const calculateAllExtraCharges = () => {
    const extraChargesAllPoints =[];
    sortedPoints.map((point) => {
      const availableOffers = getAvailableOffers(point.type, allOffers);
      const extraChargesEachPoint = availableOffers.filter((item) => point.offers.includes(item.id)).map((item) => item.price);
      const totalSumEachPoint = extraChargesEachPoint.reduce((sum, current) => sum + current, 0);
      extraChargesAllPoints.push(totalSumEachPoint);
    }
    );
    return extraChargesAllPoints;
  };

  const allExtraChargesAllPoints = calculateAllExtraCharges();
  let totalExtraChargesAllPoints = allExtraChargesAllPoints.reduce((sum, current) => sum + current, 0);
  if (totalExtraChargesAllPoints === null ) {
    totalExtraChargesAllPoints = 0;
  }


  const calculatePointsBasePrices = () => sortedPoints.map((point) => +(point.basePrice)).reduce((sum, current) => sum + current, 0);


  let totalBasePricesSum = calculatePointsBasePrices();
  if (totalBasePricesSum === null ) {
    totalBasePricesSum = 0;
  }


  const findMiddleDestination = () => {
    if (sortedPoints.length === POINTS_QUANTITY_TO_DISPLAY_MIDDLE) {
      return  sortedPoints[MIDDLE_OF_THREE].destination.name;
    }
    return '...';
  };

  const middleDestination = findMiddleDestination();

  const tripValue = totalBasePricesSum +  totalExtraChargesAllPoints;

  const getMiddleAndLastPointsTemplate = () =>{
    if (sortedPoints.length === ONLY_POINT_IN_ROUTE) {
      return '';
    }
    else if (sortedPoints.length === TWO_POINTS_IN_ROUTE_ONLY ) {
      return ` &mdash; ${lastDestination}`;
    }
    return `&mdash; ${middleDestination} &mdash; ${lastDestination}`;
  };

  const middleAndLastPoints = getMiddleAndLastPointsTemplate();


  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${firstDestination} ${middleAndLastPoints} </h1>

              <p class="trip-info__dates">${firstDateFrom}&nbsp;&mdash;&nbsp;${lastDateTo}</p>
              </div>

              <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripValue}</span>
              </p>
            </section>`
  );
};

export default class InfoView extends AbstractView{

  #sortedPoints = null;
  #allOffers = null;

  constructor (sortedPoints, allOffers) {
    super();
    this.#sortedPoints = sortedPoints;
    this.#allOffers = allOffers;
  }

  get template() {
    return createInfoTemplate(this.#sortedPoints, this.#allOffers);
  }
}
