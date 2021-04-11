namespace STDentalLibrary.Models.Enums
{
    public enum ReceptionStatus
    {
        WaitingVisit = 1, //ожидание визита пациента
        Visited = 2, //пациент посетил в назначенное время
        CanceledPatient = 3, //отменен пациентом
        NotVisited = 4, //пациент не пришел на прием
    }
}